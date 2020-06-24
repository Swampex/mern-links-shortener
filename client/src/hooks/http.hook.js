import {useState, useCallback} from 'react';

export const useHttp = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // useCallback используется для того, чтобы запомнить данную функцию, стоящую в первом параметре.
    // При последующих отрисовках компонента функция не будет пересоздаваться. Функция будет создана вновь только когда
    // будет передан второй параметр, отличающийся от второго параметра из предыдущего вызова функции
    const request = useCallback( async (url, method='GET', body=null, headers={}) => {
        if(body) {
            body = JSON.stringify(body);
            headers['Content-Type'] = 'application/json';
        }

        try {
            setLoading(true)
            const response = await fetch(url, {method, body, headers})
            const data = await response.json()

            if(!response.ok) {
                throw new Error(data.message || "Возникла непредвиденная ошибка")
            }
            setLoading(false)
            return data
        }
        catch (e) {
            setLoading(false)
            setError(e.message)
            throw e
        }
    }, [])

    const clearError =  () => setError(null);

    return {loading, request, error, clearError}
}
