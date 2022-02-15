import axios from "axios"
import Slider from '../../components/Slider'
import MainLayout from "../../components/Layouts/MainLayout"
import Info from "../../components/Info"
function ShowDetails(props) {
    return (
        <div className="bg-zinc-800">
            <MainLayout>
                {props.data ? (
                    <span>
                        <Info data={props.data} apiKey={props.api_key} />
                        <Slider
                            apiKey={props.api_key}
                            category="recommended"
                            movie_id={props.id}
                            heading="| You may also like"
                        />
                    </span>
                ) : ""}
            </MainLayout>
        </div>
    )
}

export default ShowDetails

export async function getStaticProps(context) {
    const id = context.params.id
    const api_key = process.env.TMDB_API_KEY
    const response = await axios.get(`http://api.themoviedb.org/3/movie/${id}?api_key=${api_key}&append_to_response=videos`)
    const data = await response.data
    return {
        props: {
            data: data,
            id: id,
            api_key: api_key
        }
    }
}

export async function getStaticPaths() {
    return {
        paths: [],
        fallback: true
    }
}
