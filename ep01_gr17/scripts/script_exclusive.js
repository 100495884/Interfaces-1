function openExclusivePopup() {
    document.getElementById('popup-exclusive').style.display = 'block';
}

function closeExclusivePopup() {
    document.getElementById('popup-exclusive').style.display = 'none';
}

function openRecipeDetailsPopup(title, ingredients, instructions) {
    document.getElementById('recipe-details-title').innerText = title;
    document.getElementById('recipe-details-ingredients').innerHTML = ingredients.map(ingredient => `<li>${ingredient}</li>`).join('');
    document.getElementById('recipe-details-instructions').innerText = instructions;
    document.getElementById('popup-recipe-details').style.display = 'block';
}

function closeRecipeDetailsPopup() {
    document.getElementById('popup-recipe-details').style.display = 'none';
}

document.querySelectorAll('.recipe-gallery img').forEach(img => {
    img.addEventListener('click', () => {
        const recipeDetails = {
            'receta1.jpeg': {
                title: 'Santa Claus de Fruta',
                ingredients: ['Bananas (plátanos)', 'Fresas', 'Malvaviscos pequeños', 'Grageas rojas o caramelos pequeños', 'Chocolate derretido o cobertura de chocolate', 'Palitos de brocheta'],
                instructions: '1. Pela las bananas y córtalas en rodajas gruesas. 2. Lava y corta las fresas en forma de cono. 3. Corta los malvaviscos por la mitad (opcional). 4. Ensarta un malvavisco en el palito, seguido de una fresa (punta hacia arriba) y luego una rodaja de banana. 5. Coloca una gragea roja en el centro de la banana para la nariz. 6. Usa chocolate derretido para dibujar los ojos. 7. Sirve en un plato decorativo.'
            }
            ,
            'receta2.jpeg': {
                title: 'Wellington de Carne',
                ingredients: ['1 pieza de lomo de res (aproximadamente 1 kg)', 'Aceite de oliva', 'Sal y pimienta al gusto', '300 g de champiñones picados', '2 dientes de ajo picados', '1 cucharadita de mostaza Dijon', '250 g de hojaldre', '1 huevo batido', '2 cucharadas de mantequilla', '1/2 taza de espinacas frescas', 'Tomillo fresco'],
                instructions: '1. Precalienta el horno a 200°C. 2. Sella el lomo de res en una sartén con aceite caliente por todos los lados hasta que esté dorado, luego unta con mostaza Dijon y deja enfriar. 3. Cocina los champiñones con ajo en mantequilla hasta que estén tiernos y el líquido se haya evaporado, luego mezcla con las espinacas. 4. Extiende el hojaldre, coloca el lomo en el centro, cubre con la mezcla de champiñones y espinacas, y enrolla con el hojaldre. 5. Pincha el hojaldre con un tenedor, pinta con el huevo batido y hornea durante 35-40 minutos hasta que esté dorado. 6. Deja reposar 10 minutos antes de cortar y servir.'
            }
            ,
            'receta3.jpeg': {
                title: 'Galletas de Jengibre Decoradas',
                ingredients: ['350 g de harina', '1 cucharadita de polvo de hornear', '1 cucharadita de jengibre molido', '1 cucharadita de canela molida', '1/2 cucharadita de clavo molido', '1/2 cucharadita de sal', '115 g de mantequilla', '100 g de azúcar moreno', '1 huevo', '120 ml de melaza', '1 cucharadita de extracto de vainilla', 'Glaseado real (azúcar glas y claras de huevo)'],
                instructions: '1. Precalienta el horno a 180°C. 2. En un bol grande, mezcla la harina, el polvo de hornear, el jengibre, la canela, el clavo y la sal. 3. Bate la mantequilla con el azúcar moreno hasta obtener una mezcla cremosa, luego agrega el huevo, la melaza y la vainilla. 4. Incorpora los ingredientes secos poco a poco hasta formar una masa. 5. Divide la masa en dos, envuélvela en plástico y refrigérala durante al menos 1 hora. 6. Extiende la masa sobre una superficie enharinada y corta las galletas con cortadores de formas navideñas. 7. Hornea durante 8-10 minutos y deja enfriar. 8. Decora las galletas con glaseado real usando una manga pastelera.'
            }
            ,
            'receta4.jpeg': {
                title: 'Árboles de Navidad de Hojaldre',
                ingredients: ['1 lámina de hojaldre', 'Crema de cacao o Nutella', 'Azúcar glas', 'Palitos de madera', 'Estrellas de galleta (opcional)'],
                instructions: '1. Extiende la lámina de hojaldre y úntala con crema de cacao de manera uniforme. 2. Corta la lámina en tiras largas de aproximadamente 2-3 cm de ancho. 3. Forma los árboles doblando cada tira en zigzag desde abajo hacia arriba, dejando espacio para insertar un palito de madera en la base. 4. Inserta el palito en el centro de cada árbol. 5. Coloca los árboles en una bandeja de horno con papel vegetal. 6. Hornea a 180°C (350°F) durante 10-15 minutos o hasta que el hojaldre esté dorado. 7. Espolvorea azúcar glas por encima una vez enfriados y decora con estrellas de galleta si lo deseas.'
            }
            ,
            'receta5.jpeg': {
                title: 'Brownies Árbol de Navidad',
                ingredients: [
                    '100 g de chocolate para repostería', '100 g de mantequilla', '150 g de azúcar', '2 huevos', '100 g de harina', '1/2 cucharadita de esencia de vainilla', 'Caramelos decorativos (M&M’s, chispas de colores, etc.)',  'Glaseado verde', 'Bastones de caramelo'],
                instructions: '1. Precalienta el horno a 180°C (350°F). 2. Derrite el chocolate con la mantequilla al baño maría o en el microondas y deja enfriar ligeramente. 3. En un bol, bate los huevos con el azúcar hasta obtener una mezcla espumosa. 4. Añade la mezcla de chocolate derretido y la esencia de vainilla, integrando bien. 5. Incorpora la harina tamizada y mezcla hasta que quede homogéneo. 6. Vierte la masa en un molde rectangular previamente engrasado y forrado con papel vegetal. 7. Hornea durante 20-25 minutos o hasta que al insertar un palillo salga con migas húmedas. 8. Deja enfriar por completo y corta en triángulos para formar los árboles. 9. Inserta un bastón de caramelo en la base de cada triángulo. 10. Decora con glaseado verde en zigzag y añade caramelos decorativos.'
            }
            ,
            'receta6.jpeg': {
                title: 'Roscón de Reyes',
                ingredients: [
                    '500 g de harina de fuerza', '100 g de azúcar', '25 g de levadura fresca', '2 huevos', '100 ml de leche tibia', '75 g de mantequilla (a temperatura ambiente)', 'Ralladura de 1 naranja y 1 limón', '1 cucharadita de agua de azahar', 'Frutas escarchadas', 'Azúcar perlado', '1 huevo batido (para pintar)', 'Nata montada o crema pastelera (opcional, para el relleno)'],
                instructions: '1. Disuelve la levadura en la leche tibia y deja reposar 10 minutos. 2. En un bol, mezcla la harina, el azúcar, la ralladura de naranja y limón. 3. Añade los huevos, la leche con levadura y el agua de azahar. Amasa bien. 4. Incorpora la mantequilla poco a poco y sigue amasando hasta obtener una masa lisa y elástica. 5. Deja reposar la masa en un bol engrasado, cubierto con un paño, hasta que doble su tamaño (1-2 horas). 6. Forma un círculo con la masa y colócala en una bandeja de horno. Inserta la figura del roscón y, si lo deseas, un haba. Deja reposar 1 hora más. 7. Pinta el roscón con huevo batido y decora con frutas escarchadas y azúcar perlado. 8. Hornea a 180°C (350°F) durante 20-25 minutos o hasta que esté dorado. 9. Deja enfriar y, si lo deseas, córtalo por la mitad y rellena con nata montada o crema pastelera.'
            }
        };
        const recipe = recipeDetails[img.src.split('/').pop()];
        if (recipe) {
            openRecipeDetailsPopup(recipe.title, recipe.ingredients, recipe.instructions);
        }
    });
});

document.getElementById('upload-recipe-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const imageInput = document.getElementById('user-recipe-image');
    const titleInput = document.getElementById('user-recipe-title');
    const ingredientsInput = document.getElementById('user-recipe-ingredients');
    const instructionsInput = document.getElementById('user-recipe-instructions');

    const reader = new FileReader();
    reader.onload = function(e) {
        const newRecipe = {
            title: titleInput.value,
            ingredients: ingredientsInput.value.split('\n'),
            instructions: instructionsInput.value,
            image: e.target.result
        };

        addUserRecipe(newRecipe);
        clearForm();
    };
    reader.readAsDataURL(imageInput.files[0]);
});

function addUserRecipe(recipe) {
    const userRecipesDiv = document.getElementById('user-recipes');
    const recipeDiv = document.createElement('div');
    recipeDiv.classList.add('user-recipe');

    recipeDiv.innerHTML = `
        <img src="${recipe.image}" alt="${recipe.title}">
        <h4>${recipe.title}</h4>
        <p><strong>Ingredientes:</strong></p>
        <ul>${recipe.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}</ul>
        <p><strong>Elaboración:</strong></p>
        <p>${recipe.instructions}</p>
    `;

    userRecipesDiv.appendChild(recipeDiv);
}

function clearForm() {
    document.getElementById('upload-recipe-form').reset();
}