import React from "react"
import ContentLoader from "react-content-loader"

const MyLoader = () => (
    <ContentLoader
        speed={2}
        width={150}
        height={265}
        viewBox="0 0 150 265"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
    >
        <rect x="0" y="0" rx="10" ry="10" width="150" height="90" />
        <rect x="109" y="207" rx="0" ry="0" width="0" height="1" />
        <rect x="0" y="100" rx="5" ry="5" width="150" height="15" />
        <rect x="0" y="126" rx="5" ry="5" width="100" height="15" />
        <rect x="117" y="156" rx="5" ry="5" width="32" height="32" />
        <rect x="0" y="163" rx="5" ry="5" width="80" height="24" />
    </ContentLoader>
)

export default MyLoader