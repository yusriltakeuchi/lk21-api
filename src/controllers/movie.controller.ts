import { NextFunction as Next, Request, Response } from 'express';
import axios from 'axios';
import { scrapeMovies } from '../scrapers/movie.scraper';

type TController = (req: Request, res: Response, next?: Next) => Promise<void>;

/**
 * Controller for `/movies` route
 * @param {Request} req
 * @param {Response} res
 * @param {Next} next
 */
export const latestMovies: TController = async (req, res) => {
  try {
    const {
      headers: { host },
      query: { page },
      protocol,
    } = req;

    const axiosRequest = await axios.get(
      `${process.env.LK21_URL}/latest${Number(page) > 1 ? `/page/${page}` : ''}`
    );

    // scrape movies
    const payload = await scrapeMovies(axiosRequest, { protocol, host });

    res.status(200).json(payload);
  } catch (err) {
    console.error(err);

    res.status(500).json(null);
  }
};