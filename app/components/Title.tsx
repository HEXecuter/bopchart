interface TitleProps {
    text: string
}

const Title: React.FC<TitleProps> = ({text}) => {
    return (
        <h1 className="text-center text-5xl lg:text-9xl font-semibold uppercase">
            {text}
        </h1>
    )
};

export default Title;
