class Container {
	constructor() {
		this.data = [];
	}

	async getAll() {
		try {
			let products = this.data;
			return products;
		} catch (error) {
			return error;
		}
	}

	//devuelve el producto por su ID
	async getById(id) {
		try {
			let products = this.data;
			for (let el of products) {
				if (el["id"] === parseInt(id)) {
					return el;
				}
			}
			return false;
		} catch (error) {
			return error;
		}
	}

	//agrega y guarda un nuevo objeto
	async add(obj) {
		try {
			let products = this.data;
			const id = this.generateId();
			const product = {
				...obj,
				id: id,
			};
			products.push(product);
			return product;
		} catch (error) {
			return error;
		}
	}

	//crear ID
	generateId() {
		try {
			//guarda todos los id
			const findId = this.data.map((item) => item.id);
			let newId;
			if (findId.length == 0) {
				newId = 1;
			}
			//busca el maximo iD que existe entre todo el array y le suma uno
			else {
				newId = Math.max.apply(null, findId) + 1;
			}
			return newId;
		} catch (error) {
			return error;
		}
	}

	//actualizar
	async update(obj) {
		try {
			let products = this.data;
			products.splice(obj.id - 1, 1, obj);
			return obj;
		} catch (error) {
			return error;
		}
	}

	//elimina objeto por su id
	async deleteById(id) {
		try {
			let products = this.data;
			//busca el indice del id del producto
			const idProduct = products.findIndex((prod) => prod.id === id);
			//elimina ese producto
			products.splice(idProduct, 1);
			return products;
		} catch (error) {
			console.log(error);
		}
	}
}
module.exports = Container;
