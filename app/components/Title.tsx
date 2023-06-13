interface TitleProps {
    text: string
}

const Title: React.FC<TitleProps> = ({text}) => {
    return (
        <h1 className="text-center text-9xl">
            {text}
        </h1>
    )
};

export default Title;
