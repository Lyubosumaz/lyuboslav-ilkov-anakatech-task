
import { useEffect, useState } from 'react';
import currencies from '../currencies.json';
import './app.css';

export const App = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const mockFetchData = {};
        mockFetchData.base = currencies.base.toString();
        mockFetchData.rates = Object.entries(currencies.rates).map(([key, value]) => {
            return { currency: key, value, rateColor: 'neutral' };
        });

        setData(mockFetchData);
        createTickerForTimePeriod(5); // current period 5 minutes
    }, []);

    const createTickerForTimePeriod = (minutes) => {
        let keyWord = 'increase';

        const incOrDecEveryFiveSeconds = setInterval(() => {
            incOrDecData(keyWord);
        }, 1000 * 5);

        const oneMinutes = setInterval(() => {
            keyWord = keyWord === 'increase' ? 'decrease' : 'increase';
        }, 1000 * 60);

        const selectedMinutes = setTimeout(() => {
            clearInterval(incOrDecEveryFiveSeconds);
            clearInterval(oneMinutes);
            clearTimeout(selectedMinutes);
        }, 1000 * 60 * minutes);
    }

    const incOrDecData = (arg) => {
        setData(prevState => {
            return {
                base: prevState && prevState.base,
                rates: (prevState && Array.isArray(prevState.rates)) && prevState.rates.map((item) => {
                    let rateValue = item.value;
                    let rateColor = 'neutral';

                    if (arg === 'increase') {
                        rateValue += 0.0001;
                        rateColor = 'increase';
                    }
                    else if (arg === 'decrease') {
                        rateValue -= 0.0001;
                        rateColor = 'decrease';
                    }

                    if (rateValue < 1.0001) rateColor = 'neutral';

                    return {
                        currency: item.currency,
                        value: rateValue,
                        rateColor,
                    };
                }),
            }
        });
    }

    if (data === null) {
        return (
            <main>
                <p className='error-msg'>Still loading...</p>
            </main>
        );
    }

    return (
        <main>
            {typeof data.base === 'string' && Array.isArray(data.rates) && data.rates.length > 0
                ?
                <table className="forex-table">
                    <thead>
                        <tr>
                            <th colSpan="3">Dynamic Forex Rates</th>
                        </tr>
                        <tr>
                            <th>#</th>
                            <th>Exchange Target</th>
                            <th>Current Rate</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.rates.map((rate, index) => {
                            const fixValue = rate.value < 1.0001 ? 1.0001 : rate.value.toFixed(4);
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{`${data.base}${rate.currency}`}</td>
                                    <td><span className={rate.rateColor}>{fixValue}</span></td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                :
                <p className="error-msg">Data fetching failed...</p>
            }
        </main>
    );
}
