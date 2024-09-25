import axios from "axios";

const instance = axios.create({
	 baseURL: process.env.NEXT_PUBLIC_API_ARTILAB_ROOT,
});

const seo = axios.create({
	 baseURL: process.env.NEXT_PUBLIC_API_ARTILAB_SEO,
});

export const apiWP = {
	 link(attributes) {
			return instance.get(`${attributes}`)
			.then((response) => response)
	 },
	 getPages(attributes) {
			return instance.get(`/pages?slug=${attributes}`)
			.then((response) => response.data)
	 },
	getPage(attributes) {
		return instance.get(`/pages/${attributes}`)
		.then((response) => response.data)
	},
	 getSEO(url) {
			return seo.get(url)
			.then((response) => response)
	 },

}