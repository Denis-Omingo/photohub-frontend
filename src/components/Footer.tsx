const Footer=()=>{
    return( <div className="bg-primary py-10">
        <div className="container mx-auto flex flex-col md:flex-row justify-between">
            <span className="text-3xl text-primary-foreground font-bold tracking-tight">PhotoHub</span>
            <span className="text-background font-bold tracking-tight flex gap-4">
                <span>Privacy Policy</span>
                <span>Terms of Service</span>
            </span>
        </div>
    </div>)
}
export default Footer;