import React from "react"
import useApi from "../../hooks/useApi"

const hocAPI = (Component, fetchData, successMessage = "Action completed successfully!") => {
    const API = useApi()

    return (props = {}) => {
        const [data, setData] = React.useState(null)
        const fetched = React.useRef(false)

        React.useEffect(() => {
            if (fetched.current === true) return undefined;
            fetched.current = true;

            API.request(
                fetchData,
                data => {
                    setData(data)
                },
                successMessage
            )
        }, [fetchData])

        if (!data) {
            return <span className='p-4 bg-white m-3'></span>
        }
        return <Component {...props} data={data} />
    }
}



export default hocAPI;