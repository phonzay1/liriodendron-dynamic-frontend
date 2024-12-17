export function User({ name, favoriteAnimal }) {
  return (
    <li>
      <strong>Name:</strong> {name} <br />
      <strong>Favorite Animal:</strong> {favoriteAnimal} 
    </li>
  );
}