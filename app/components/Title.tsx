interface TitleProps {
    text: string
}

const Title: React.FC<TitleProps> = ({ text }) => {
    return (
        <h1 className="text-center text-3xl lg:text-6xl font-semibold uppercase  mt-4">
            {text}
        </h1>
    )
};

export default Title;
