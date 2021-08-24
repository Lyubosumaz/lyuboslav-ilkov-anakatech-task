
import React, { useEffect, useState } from 'react';
import currencies from '../currencies.json';
import "./app.css";

export const App = () => {
    const [data, setData] = useState({});
    const isDataPresent = typeof data.base === "string" && Array.isArray(data.rates) && data.rates.length > 0;

    useEffect(() => {
        let mockFetchData = {};
        mockFetchData.base = currencies.base.toString();
        mockFetchData.rates = Object.entries(currencies.rates).map(([key, value]) => {
            return { currency: key, value, rateColor: 'neutral' };
        });

        setData(mockFetchData);
        createTickerForTimePeriod(5);
    }, []);

    const createTickerForTimePeriod = (minutes) => {
        let keyWord = "increase";

        const incOrDecEveryFiveSeconds = setInterval(() => {
            incOrDecData(keyWord);
        }, 1000 * 5);

        const oneMinutes = setInterval(() => {
            keyWord = keyWord === "increase" ? "decrease" : "increase";
        }, 1000 * 60);

        const fiveMinutes = setTimeout(() => {
            clearInterval(incOrDecEveryFiveSeconds);
            clearInterval(oneMinutes);
            clearTimeout(fiveMinutes);
        }, 1000 * 60 * minutes);
    }

    const incOrDecData = (arg) => {
        setData(prevState => {
            return {
                base: prevState.base,
                rates: prevState.rates.map((item) => {
                    if (arg === "increase") return {
                        currency: item.currency,
                        value: item.value + 0.0001,
                        rateColor: (item.value + 0.0001 < 1.0001) ? 'neutral' : 'increase',
                    };
                    if (arg === "decrease") return {
                        currency: item.currency,
                        value: item.value - 0.0001,
                        rateColor: (item.value - 0.0001 < 1.0001) ? 'neutral' : 'decrease',
                    };
                    return { currency: item.currency, value: item.value, rateColor: 'neutral' };
                }),
            }
        });
    }

    if (data === undefined) {
        return (
            <main>
                <div>Still loading...</div>
            </main>
        );
    }

    return (
        <main>
            {isDataPresent
                ?
                <table>
                    <thead>
                        <tr>
                            <th colSpan="2">The table header</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.rates.map((rate, index) => {
                            const fixValue = rate.value < 1.0001 ? 1.0001 : rate.value.toFixed(4);
                            return (
                                <tr key={index}>
                                    <td><span>{`${data.base}${rate.currency}`}</span></td>
                                    <td><span className={rate.rateColor}>{fixValue.toString()}</span></td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                :
                <div>Data fetching failed...</div>
            }
        </main>
    );
}
