import axios from 'axios';
import { NextFunction as Next, Request, Response } from 'express';
import { scrapeMovies } from '@/scrapers/movie';
import { scrapeSetOfYears } from '@/scrapers/year';
import { SendResponse } from "@/dto/response_dto";

type TController = (req: Request, res: Response, next?: Next) => Promise<void>;

/**
 * Controller for `/years` route
 * @param {Request} req
 * @param {Response} res
 * @param {Next} next
 */
export const setOfYears: TController = async (req, res) => {
    try {
        const axiosRequest = await axios.get(
            `${process.env.LK21_URL}/rekomendasi-film-pintar`
        );

        const payload = await scrapeSetOfYears(req, axiosRequest);

        res.status(200).json(SendResponse(true, payload));
    } catch (err) {
        console.error(err);

        res.status(400).json(SendResponse(false, null));
    }
};

/**
 * Controller for `/years/:year` route
 * @param {Request} req
 * @param {Response} res
 * @param {Next} next
 */
export const moviesByYear: TController = async (req, res) => {
    try {
        const { page = 0 } = req.query;
        const { year } = req.params;

        const axiosRequest = await axios.get(
            `${process.env.LK21_URL}/year/${year}${
                Number(page) > 1 ? `/page/${page}` : ''
            }`
        );

        const payload = await scrapeMovies(req, axiosRequest);

        res.status(200).json(SendResponse(true, payload));
    } catch (err) {
        console.error(err);

        res.status(400).json(SendResponse(false, null));
    }
};
