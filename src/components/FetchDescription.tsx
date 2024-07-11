import React, { useState, useEffect } from "react";
import axios, { AxiosRequestConfig } from "axios";

const apiKey = import.meta.env.VITE_TMDB_API;
const bearerToken = import.meta.env.VITE_TMDB_BEARER_TOKEN;

type MovieDescription = {
  id: number;
  overview: string;
  backdrop_path: string;
};

type FetchDescriptionProps = {
  title: string;
};

const FetchDescription: React.FC<FetchDescriptionProps> = ({ title }) => {
  const [movieDescription, setMovieDescription] =
    useState<MovieDescription | null>(null);

  useEffect(() => {
    const fetchDescription = async () => {
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
    return <div>Loading...</div>;
  }

  return (
    <>
      <div
        className="flex-col gap-4 bg-slate-300 p-4 rounded-md shadow-lg transition-all duration-500 animate-slideIn mb-4 left-[500px] bg-cover bg-center cursor-pointer"
        style={{
          backgroundImage: `url(https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces/${movieDescription.backdrop_path})`,
        }}
      >
        <div className="max-w-[400px] min-h-[200px] shadow-md rounded-lg p-4 bg-slate-300">
          <p className="z-20">{movieDescription.overview}</p>
        </div>
      </div>
    </>
  );
};

export default FetchDescription;
