import Link from "next/link";
import { auth } from "@/auth";
import { getUserById, SignOut } from "@/lib/actions/user.action";

export default async function Home() {
	const session = await auth();
	let user = null;

	if (session?.user?.id) {
		user = await getUserById(session.user.id);
	}

	return (
		<main className="flex min-h-screen flex-col items-center p-24">
			{session ? (
				<div>
					<Link href="/user">User</Link>
					<p>Welcome {user?.name}</p>
					<form action={SignOut}>
						<button>Signout</button>
					</form>
					<pre>{JSON.stringify(user, null, 2)}</pre>
				</div>
			) : (
				<Link href="/api/auth/signin">Login</Link>
			)}
		</main>
	);
}
