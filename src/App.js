import Content from './Content';
import Footer from './Footer';
import { Header } from './Header';

function App() {
  return (
    <div className="App">
      <Header />
      <Content />
      <Footer />
    </div>
  );
}

export default App;
//A default export is like saying, "This is the main thing I want to share from this file."
// When other parts of your project want to use something from this file, they will get whatever is marked as the default export.
