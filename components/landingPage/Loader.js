import React from 'react'
import { motion } from 'framer-motion'

const Loader = () => {

    const loaderVariants = {
        animationOne: {
            x: [-20, 20],
            y: [0, -30],
            transition: {
                x: {
                    yoyo: Infinity,
                    duration: 0.6
                },
                y: {
                    yoyo: Infinity,
                    duration: 0.25,
                    ease: 'easeOut'
                },
            }
        }
    }

    return (
        <>
            <motion.div
                variants={loaderVariants}
                animate="animationOne"
                className="w-6 h-6 rounded-full bg-yellow-600 shadow-lg"
            >

            </motion.div>
        </>
    )
}

export default Loader