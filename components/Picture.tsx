import { motion, Variants } from "framer-motion";
import Link from "next/link";

export type PictureProps = {
    albumId: number,
    id: number,
    title: string,
    url: string,
    thumbnailUrl: string,
};

const cardVariants: Variants = {
    initial: {
        scale: 0.9,
        transition: {
            when: 'afterChildren',
        },
    },
    enter: {
        scale: 1,
        transition: {
            when: 'beforeChildren',
            duration: .3,
        },
    },
};

const textVariants: Variants = {
    initial: {
        opacity: 0,
    },
    enter: {
        opacity: 1,
    },
};

const Picture: React.FC<PictureProps> = ({
    id, title, url,
    albumId, thumbnailUrl
}) => {
    return (
        <motion.div className='card' variants={cardVariants} initial="initial" animate="enter">
            <div className="card-image">
                <motion.figure 
                    className="image"
                    layoutId={`img-${id}`}
                >
                    <img src={url} alt={title} />
                </motion.figure>
            </div>
            <motion.div variants={textVariants} className="card-content">
                <div className="media">
                    <div className="media-left">
                        <Link href={`/images/${id}`}>
                            <a>
                                <figure className="image is-50by50">
                                    <img src={thumbnailUrl} alt="thumbnail" />
                                </figure>
                            </a>
                        </Link>
                    </div>
                    <motion.div variants={textVariants} className="media-content">
                        <p className="title is-6">{title}</p>
                    </motion.div>
                </div>
                <motion.div variants={textVariants} className='content'>
                    Some random text Some random text 
                    Some random text Some random text
                    <br />
                    <strong>Album id</strong>:&nbsp;<em>{albumId}</em>
                </motion.div>
            </motion.div>
        </motion.div>
    );
}

export default Picture;
