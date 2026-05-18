const PageDescription = ({ children, className = "", ...rest }) => {
    return (
        <p className={`mt-1 text-sm text-gray-500 ${className}`}
            {...rest}
        >
            {children}
        </p >
    )
}
export default PageDescription;