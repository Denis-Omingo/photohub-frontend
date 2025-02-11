import Footer from "@/components/Footer";
import Header from "@/components/Header";


interface Props {
    children:React.ReactNode;
};

function Layout({children}: Props) {
    return (
        <div className="flex flex-col min-h-screen">
            <Header/>
            <div className="container mx-auto flex-1 py-10">
                {children}
            </div>
            <Footer/>
        </div>
    )
}

export default Layout
