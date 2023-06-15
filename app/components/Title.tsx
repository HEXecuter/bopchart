interface TitleProps {
    text: string
}

const Title: React.FC<TitleProps> = ({text}) => {
    return (
        <h1 className="text-center text-2xl lg:text-6xl font-semibold uppercase">
            {text}
        </h1>
    )
};

export default Title;
