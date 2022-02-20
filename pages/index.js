import MainLayout from '../components/Layouts/MainLayout'
import Slider from '../components/Slider'
import SlideShow from '../components/SlideShow'

export default function Home(props) {
  return (
    <div className="bg-zinc-800 border-0">
      <MainLayout>
        <SlideShow apiKey={props.apiKey} />
        <Slider
          apiKey={props.apiKey}
          heading="| Trending "
          subHeading="This weeks top movie and TV"
          category="trending"
        />
        {/* <Slider
          apiKey={props.apiKey}
          heading="| Most Rated "
          subHeading="Show time is here"
          category="rated"
        />
        <Slider
          apiKey={props.apiKey}
          heading="| Action Movies "
          subHeading="Top rated Action Movies"
          category="actionMovies"
        />
        <h2 className="text-yellow-500 ml-20 text-2xl font-semibold mt-10 mb-5">Soon in your theatre</h2>
        <Slider
          apiKey={props.apiKey}
          heading="| Comming soon"
          category="upcoming"
        /> */}
      </MainLayout>
    </div>
  )
}

export async function getStaticProps(context) {
  const api_key = process.env.TMDB_API_KEY
  return {
    props: {
      apiKey: api_key
    }
  }
}
