import React, { useState, useEffect } from "react";
import axios, { AxiosRequestConfig } from "axios";
import { FaImdb } from "react-icons/fa";
import { CgSpinnerAlt } from "react-icons/cg";

const apiKey = import.meta.env.VITE_TMDB_API;
const bearerToken = import.meta.env.VITE_TMDB_BEARER_TOKEN;

type MovieDescription = {
  id: number;
  overview: string;
  backdrop_path: string;
};

type FetchDescriptionProps = {
  title: string;
  id: string;
  action: boolean;
};

const FetchDescription: React.FC<FetchDescriptionProps> = ({
  title,
  id,
  action,
}) => {
  const [movieDescription, setMovieDescription] =
    useState<MovieDescription | null>(null);
  const imdbLink = `https://www.imdb.com/title/${id}/`;
  console.log(action);

  useEffect(() => {
    const fetchDescription = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const options: AxiosRequestConfig = {
        method: "GET",
        url: `https://api.themoviedb.org/3/search/movie`,
        params: {
          query: title,
          api_key: apiKey,
        },
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${bearerToken}`,
        },
      };

      try {
        const response = await axios.request(options);
        console.log("Response Data:", response.data);

        if (response.data.results && response.data.results.length > 0) {
          const movie = response.data.results[0];
          const movieDesc: MovieDescription = {
            id: movie.id,
            overview: movie.overview,
            backdrop_path: movie.backdrop_path,
          };

          setMovieDescription(movieDesc);
        } else {
          console.warn("No movies found for the given title.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDescription();
  }, [title]);

  if (!movieDescription) {
    return (
      <div className="flex justify-center items-center">
        <CgSpinnerAlt className="text-6xl animate-spin" color="black" />
      </div>
    );
  }

  return (
    <>
      <div
        className="flex-col gap-4 p-4 rounded-md shadow-lg transition-all duration-500 animate-slideIn mb-4 left-[500px] bg-cover bg-center cursor-pointer"
        style={{
          backgroundImage: `url(https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces/${movieDescription.backdrop_path})`,
        }}
      >
        <div className="flex justify-between">
          <div className="max-w-[400px] min-h-[200px] shadow-md rounded-lg p-4 bg-slate-500">
            <p className="z-20">{movieDescription.overview}</p>
          </div>
          <a href={imdbLink} target="_blank">
            <FaImdb size={50} color="white" />
          </a>
        </div>
      </div>
    </>
  );
};

export default FetchDescription;
