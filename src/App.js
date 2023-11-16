import CustomizedTables from './Table/CustomizedTables';
import store from './Redux/store';
import { Provider } from 'react-redux';
import './App.css';

function App() {
  return (
  <div className='app-container'>
      <Provider store={store}>
    <CustomizedTables/>
    </Provider>
  </div>
  );
}

export default App;
