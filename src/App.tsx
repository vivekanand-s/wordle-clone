import { Provider } from 'react-redux';
import { KeyBoard } from './components/keyboard/Keyboard';
import { Grid } from './components/grid/Grid';
import { store } from './store';
import './App.css';

function App() {
    return (
        <div className="app">
            <h1>WORDLE CLONE</h1>
            <Provider store={store}>
                <section style={{ display: 'grid', placeItems: 'center' }}>
                    <Grid />
                    <KeyBoard />
                </section>
            </Provider>
        </div>
    );
}

export default App;
