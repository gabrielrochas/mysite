import Image from 'next/image'

export default function Home() {
	return (
		<div className="flex h-screen flex-col items-center justify-center px-4">
			<div className="flex flex-col items-center space-y-8">
				<div className="relative h-[80px] w-full md:h-[140px]">
					<Image
						src="/logo-dark.svg"
						alt="Gabriel Rocha Logo"
						fill
						className=""
					/>
				</div>
				<div className="flex flex-col items-center">
					<h1 className="mb-4 font-bold">
						Olá! Bem-vindo ao meu portfólio
					</h1>
					<p className="text-lg text-tertiary">
						Em breve, este site será lançado oficialmente com todos os meus
						projetos e serviços.
					</p>
				</div>
			</div>
		</div>
	)
}
