import { useState, useEffect } from "react";
import FetchDescription from "./FetchDescription";
import { Skeleton } from "./ui/skeleton";

const apiKey = import.meta.env.VITE_OMDB_API;

interface Movie {
  Title: string;
  imdbID: string;
  Poster: string;
  imdbRating: string;
  Rated: string;
}

// Generated id list from chatgpt since doing it manually takes a while
const top250MovieIds = [
  "tt0111161",
  "tt0068646",
  "tt0071562",
  "tt0468569",
  "tt0050083",
  "tt0108052",
  "tt0167260",
  "tt0110912",
  "tt0060196",
  "tt0120737",
  "tt0137523",
  "tt0109830",
  "tt1375666",
  "tt0167261",
  "tt0080684",
  "tt0133093",
  "tt0099685",
  "tt0073486",
  "tt0047478",
  "tt0114369",
  "tt0317248",
  "tt0102926",
  "tt0118799",
  "tt0038650",
  "tt0114814",
  "tt0245429",
  "tt0120815",
  "tt0110413",
  "tt0120689",
  "tt0816692",
  "tt0056058",
  "tt0088763",
  "tt0027977",
  "tt1675434",
  "tt0482571",
  "tt0209144",
  "tt0076759",
  "tt0095765",
  "tt0253474",
  "tt0407887",
  "tt0172495",
  "tt0082971",
  "tt0032553",
  "tt2582802",
  "tt0095327",
  "tt0078788",
  "tt0119698",
  "tt0047396",
  "tt0021749",
];

const FetchMovie: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [showMovieInfo, setShowMovieInfo] = useState(false);
  const [movieTitle, setMovieTitle] = useState<string>("");
  const [movieID, setMovieID] = useState<string>("");

  const handleCardClick = (title: string, id: string) => {
    console.log("Clicked");
    if (!showMovieInfo) {
      setShowMovieInfo(true);
      setMovieTitle(title);
      setMovieID(id);
      console.log(movieTitle, id);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else setShowMovieInfo(false);
  };

  useEffect(() => {
    const fetchMovies = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      try {
        const fetchedMovies = await Promise.all(
          top250MovieIds.map(async (id) => {
            const response = await fetch(
              `https://www.omdbapi.com/?i=${id}&apikey=${apiKey}`
            );
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data;
          })
        );
        setMovies(fetchedMovies);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <>
      {!showMovieInfo ? (
        <div className="flex flex-wrap gap-4 justify-center box-border">
          {movies.length > 0 ? (
            movies.map((movie) => (
              <div
                key={movie.Title}
                className="bg-[#613b34] h-[450px] lg:w-[250px] sm:w-[300px] overflow-hidden rounded-md box-border cursor-pointer text-white"
                onClick={() => {
                  console.log(movie.Title, movie.imdbID);
                  handleCardClick(movie.Title, movie.imdbID);
                }}
              >
                <img
                  className="h-4/5 w-full hover:scale-125 hover:translate-y-[45px] transition ease-in-out duration-500"
                  src={movie.Poster}
                />
                <div className="flex-col pl-2 pt-2">
                  <h1 className="text-xl font-noto">{movie.Title}</h1>
                  <p className="italic font-noto">
                    IMDB Rating: {movie.imdbRating}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-wrap gap-4 justify-center box-border">
              <Skeleton className="h-[450px] lg:w-[250px] rounded-md" />
              <Skeleton className="h-[450px] lg:w-[250px] rounded-md" />
              <Skeleton className="h-[450px] lg:w-[250px] rounded-md" />
              <Skeleton className="h-[450px] lg:w-[250px] rounded-md" />
              <Skeleton className="h-[450px] lg:w-[250px] rounded-md" />
              <Skeleton className="h-[450px] lg:w-[250px] rounded-md" />
              <Skeleton className="h-[450px] lg:w-[250px] rounded-md" />
              <Skeleton className="h-[450px] lg:w-[250px] rounded-md" />
              <Skeleton className="h-[450px] lg:w-[250px] rounded-md" />
              <Skeleton className="h-[450px] lg:w-[250px] rounded-md" />
              <Skeleton className="h-[450px] lg:w-[250px] rounded-md" />
            </div>
          )}
        </div>
      ) : (
        <>
          <div
            onClick={() => {
              handleCardClick("", "");
            }}
          >
            <FetchDescription
              title={movieTitle}
              id={movieID}
              action={showMovieInfo}
            />
          </div>
          <div className="flex flex-wrap gap-4 justify-center box-border">
            {movies.length > 0 ? (
              movies.map((movie) => (
                <div
                  key={movie.imdbID}
                  className="bg-[#613b34] h-[450px] lg:w-[250px] sm:w-[300px] overflow-hidden rounded-md box-border cursor-pointer text-white"
                  onClick={() => {
                    handleCardClick(movie.Title, movie.imdbID);
                  }}
                >
                  <img
                    className="h-4/5 w-full hover:scale-125 hover:translate-y-[45px] transition ease-in-out duration-500"
                    src={movie.Poster}
                  />
                  <div className="flex-col pl-2 pt-2">
                    <h1 className="text-xl">{movie.Title}</h1>
                    <p className="italic">IMDB Rating: {movie.imdbRating}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex justify-center items-center">
                <Skeleton className="w-[300px] h-[450px] rounded-full" />
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};
export default FetchMovie;
