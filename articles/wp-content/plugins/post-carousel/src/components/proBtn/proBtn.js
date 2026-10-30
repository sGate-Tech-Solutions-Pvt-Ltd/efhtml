import "./editor.scss";

const ProBtn = ({ proBtnClass = "" }) => {
    return (
        <span className={`sp-smart-pro-btn-wrapper ${proBtnClass}`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M8.637 5.535a.99.99 0 0 0 .66.506.92.92 0 0 0 .814-.23l1.725-1.584-.56 4.45H2.735l-.56-4.45L3.9 5.81a.92.92 0 0 0 .813.23c.287-.06.52-.25.66-.505l1.631-2.992z" stroke="#fff"/><path d="M11.226 12.057H2.784c-.272 0-.492-.269-.492-.6v-1.32h9.424v1.32c0 .331-.22.6-.492.6" fill="#fff"/></svg>
            Pro
        </span>
    );
};

export default ProBtn;