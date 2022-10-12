import Picture, { PictureProps } from "../components/Picture";
import { NextPage, GetStaticProps } from "next"

export const base = 'https://jsonplaceholder.typicode.com';

type IndexProps = {
    pictures: PictureProps[],
}

const Home: NextPage<IndexProps> = ({ pictures }) => {
    return (
        <div className="container pt-4">
            <div className="columns is-multiline">
                {
                    pictures.map(pic => (
                        <div key={pic.id} className="column is-one-third-desktop is-half-tablet is-full-mobile">
                            <Picture {...pic} />
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export const getStaticProps: GetStaticProps = async () => {
    const pics = await fetch(`${base}/photos?_start=0&_limit=15`)
        .then(res => res.json())
        .then(res => res)
        .catch(err => console.log("fetching error", err));
    return {
        props: {
            pictures: pics,
        },
    };
}

export default Home;
