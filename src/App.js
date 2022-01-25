import { CountrySelect } from "components";

function App() {
  return (
    <div className="App">
      <CountrySelect
        countryCode="us"
        className="custom-whatever"
        onChange={(value) => console.log("value", value)}
      />
    </div>
  );
}

export default App;
