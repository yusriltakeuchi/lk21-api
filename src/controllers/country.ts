import axios from 'axios';
import { NextFunction as Next, Request, Response } from 'express';
import { scrapeSetOfCountries } from '@/scrapers/country';
import { scrapeMovies } from '@/scrapers/movie';
import { SendResponse } from "@/dto/response_dto";

type TController = (req: Request, res: Response, next?: Next) => Promise<void>;

/**
 * Controller for `/countries` route
 * @param {Request} req
 * @param {Response} res
 * @param {Next} next
 */
export const setOfCountries: TController = async (req, res) => {
    try {
        const axiosRequest = await axios.get(
            `${process.env.LK21_URL}/rekomendasi-film-pintar`
        );

        const payload = await scrapeSetOfCountries(req, axiosRequest);

        res.status(200).json(SendResponse(true, payload));
    } catch (err) {
        console.error(err);

        res.status(400).json(SendResponse(false, null));
    }
};

/**
 * Controller for `/countries/{country}` route
 * @param {Request} req
 * @param {Response} res
 * @param {Next} next
 */
export const moviesByCountry: TController = async (req, res) => {
    try {
        const { page = 0 } = req.query;
        const { country } = req.params;

        const axiosRequest = await axios.get(
            `${process.env.LK21_URL}/country/${country.toLowerCase()}${
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
