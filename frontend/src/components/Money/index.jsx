const CurrentCyFormatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND"
});

const Money = ({ value }) => {
    return CurrentCyFormatter.format(value);
}

export default Money