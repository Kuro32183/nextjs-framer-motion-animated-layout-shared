import { motion } from "framer-motion";
import { PictureProps } from "../../components/Picture";
import { base } from '../index';
import { NextPage, GetStaticProps, GetStaticPaths } from "next";
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';

type ImagePageProps = {
    image: PictureProps,
}

interface Image extends ParsedUrlQuery {
	image: string,
 }


const Image: NextPage<ImagePageProps> = ({ image }) => {
    const { isFallback } = useRouter();
    return isFallback ? <div>loading...</div> 
        : (
            <div>   
                {
                    image &&
                    <motion.div layoutId={`img-${image.id}`} style={{
                        backgroundImage: `url('${image.url}')`, backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat', backgroundSize: 'cover',
                        height: '70vh', position: 'relative', top: 0, left: 0, width: '100%',
                    }}>
                    </motion.div>
                }
            </div>
        );
}

export const getStaticProps: GetStaticProps = async ctx => {
    const  image  = ctx.params;
    const pic = await fetch(`${base}/photos/${image}`)
        .then(res => res.json())
        .then(res => res)
        .catch(err => console.log(err));
    return {
        props: {
            image: pic,
        },
    };
}

export const getStaticPaths: GetStaticPaths = async () => {
    const ids = await fetch(`${base}/photos?_start=0&_limit=15`)
        .then(res => res.json())
        .then(res => res.map((el: { id: { toString: () => any; }; }) => el.id.toString()))
        .catch(err => console.log(err));
    return {
        paths: ids.map((id: string) => ({
            params: {
                image: id,
            },
        })),
        fallback: true,
    };
};

export default Image;