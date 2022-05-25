const { Router } = require("express");
const router = Router();
const Products = require("../../container.js");
const multer = require("multer");

//instancio la clase con la base de datos y sus metodos
const product = new Products();
console.log(__dirname);

// Multer - subir archivos
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "public/files");
	},
	filename: function (req, file, cb) {
		cb(null, file.originalname);
	},
});
router.use(multer({ storage }).single("thumbnail")); // 'thumbnail' es el nombre del campo en el formulario.

//middlewares
const existProduct = async function (req, res, next) {
	//controla si eciste el producto por su id
	const allProducts = await product.getAll();
	for (el of allProducts) {
		if (el.id === Number(req.params.id)) {
			return next();
		}
	}
	//si no existe
	next("error");
};

const noProductError = async function (err, req, res, next) {
	//mensaje de error al no existir producto
	if (err) {
		return res
			.status(500)
			.json({ error: ` producto con el id ${req.params.id} no encontrado` });
	}
	next();
};

//pagina index
router.get("/", async (req, res) => {
	try {
		return res.render("index", { allProducts: 0 });
	} catch (error) {
		console.log(error);
	}
});


//agrega producto
router.post("/", async (req, res) => {
	try {
		const { title, price } = req.body;
		const image = req.file;
		const obj = { title, price, thumbnail: `../../files/${image.filename}` };
		await product.add(obj);
		// return res.render("index",{ Agregado: productAdd });
		return res.redirect("/productos");
	} catch (error) {
		console.log(error);
	}
});

//devuelve todos los productos
router.get("/list", async (req, res) => {
	try {
		let allProducts = await product.getAll();
		return res.render("list", { allProducts });
	} catch (error) {
		console.log(error);
	}
});

//devuelve producto por ID
router.get("/:id", existProduct, noProductError, async (req, res) => {
	try {
		const { id } = req.params;
		let productId = await product.getById(id);
		return res.json({ Producto: productId });
	} catch (error) {
		console.log(error);
	}
});

//actualiza producto(reemplaza)
router.put("/:id", existProduct, noProductError, async (req, res) => {
	try {
		const { id } = req.params;
		const { title, price, thumbnail } = req.body;
		const obj = {
			title,
			price,
			thumbnail,
			id: Number(id),
		};
		let productUpload = await product.update(obj);
		res.json({ productUpload });
	} catch (error) {
		console.log(error);
	}
});

//elimina producto
router.delete("/:id", existProduct, noProductError, async (req, res) => {
	try {
		const { id } = req.params;
		let productDelete = await product.deleteById(Number(id));
		return res.json({ productDelete });
	} catch (error) {
		console.log(error);
	}
});

module.exports = router;
