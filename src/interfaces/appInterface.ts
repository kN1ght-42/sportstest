interface IAppItem {
	id: string,
	text: string,
	author: {
		nick: string 
	},
	published: {
		bunin: string
	},
	rating: {
		plus: number,
		minus: number
	},
	parentComment: {
		id: string,	
		author: {
			nick: string
		},
		text: string
	},
	idButton: string
}

export default IAppItem