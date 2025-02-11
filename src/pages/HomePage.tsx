import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import Hero from "@/components/Hero";
import { User } from "@/types";


const HomePage: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch users and albums count (Replace with react-query later)
        const fetchUsers = async () => {
            const response = await fetch("/api/users"); // Example API endpoint
            const data: User[] = await response.json();
            setUsers(data);
        };

        fetchUsers();
    }, []);

    return (
       <div>
        <Hero/>
         <div className="flex flex-col gap-12 p-6">
            <div className="bg-background shadow-md py-8 flex flex-col gap-5 text-center -mt-16">
                <h1 className="text-3xl font-bold text-primary-foreground">Welcome to the Platform</h1>
                <p className="text-lg text-secondary-foreground">Explore users and their albums</p>
            </div>

            {/* Display Users Table */}
            <div className="bg-secondary shadow-lg rounded-lg p-6">
                <h2 className="text-2xl font-semibold text-primary-foreground mb-4">All Users</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-background border border-gray-200">
                        <thead>
                            <tr className="bg-primary border-b">
                                <th className="p-3 text-left text-primary-foreground">Username</th>
                                <th className="p-3 text-left text-primary-foreground">Albums</th>
                                <th className="p-3 text-left text-primary-foreground">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.email} className="border-b">
                                    <td className="p-3 text-secondary-foreground">{user.name || user.userName}</td>
                                    <td className="p-3 text-secondary-foreground">{user.email}</td>
                                    <td className="p-3">
                                        <button onClick={() => navigate(`/user/${user.email}`)} className="text-blue-500 hover:underline">
                                            View Profile
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Display All Albums Link */}
            <Card className="cursor-pointer hover:shadow-xl transition bg-primary" onClick={() => navigate("/albums")}>
                <CardContent className="p-6 text-center">
                    <h3 className="text-xl font-semibold text-primary-foreground">View All Albums</h3>
                </CardContent>
            </Card>
        </div>
       </div>
    );
};

export default HomePage;
