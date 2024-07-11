import "./App.css";
import FetchMovie from "./components/FetchMovie";

function App() {
  return (
    <>
      {/* Page container */}
      <div className="w-full max-w-[1366px] flex flex-col items-center pt-8 px-4">
        <header className="w-full text-white p-4 fixed top-0 left-0 z-10">
          {/* Background image with dark filter */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                'url("https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fst3.depositphotos.com%2F1064045%2F15061%2Fi%2F600%2Fdepositphotos_150614902-stock-photo-unusual-cinema-concept-3d-illustration.jpg&f=1&nofb=1&ipt=b5be551353391d883fba9040453a014c25c7f8ef504ac98cd0338b38b9ad29cb&ipo=images")',
              filter: "brightness(0.5)", // Dark filter
              zIndex: -1, // Place it behind the text
            }}
          ></div>

          {/* Content within the header */}
          <div className="relative z-20 text-center">
            <h1 className=" text-slate-300 tracking-wide lg:text-7xl md:text-5xl sm:text-5xl font-bold uppercase">
              Movie descriptions
            </h1>
            <p className="text-slate-300 uppercase mt-8 lg:text-xl md:text-lg">
              Press a movie card to see the description
            </p>
          </div>
        </header>
        {/* Main section */}
        <main className="w-full flex-grow p-18">
          <div className="pt-40">
            <FetchMovie />
          </div>
        </main>
        <footer className="w-full max-w-[60%] flex justify-between pt-16 pb-8">
          <a
            href="https://github.com/vikkiklikk"
            className="hover:text-white transition-colors duration-300 ease-in-out"
          >
            <small>Vikki Klikk 2024</small>
          </a>{" "}
          <small>Vefskólinn</small>
        </footer>
      </div>
    </>
  );
}

export default App;
