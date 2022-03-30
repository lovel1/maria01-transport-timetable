import InfoSection from "./components/sections/InfoSection";
import TimetableSection from "./components/sections/TimetableSection";
import { Provider } from 'react-redux'
import { store } from "./store"


function App() {

  return (
    <Provider store={store}>
      <div className={"App " + styles.container}>
          <TimetableSection />
          <InfoSection />
      </div>
    </Provider>
  );
}

const styles = {
  container: 'bg-slate-200 text-slate-900 min-h-screen flex flex-col lg:flex-row shadow'
}

export default App;
