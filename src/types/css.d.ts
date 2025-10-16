// Declarations for importing CSS/SCSS files in TypeScript.
// This allows side-effect imports like `import "./globals.css";`
// and module imports like `import styles from './button.module.css'`.

declare module "*.module.css" {
	const classes: { readonly [key: string]: string };
	export default classes;
}

declare module "*.module.scss" {
	const classes: { readonly [key: string]: string };
	export default classes;
}

// Generic declarations for plain CSS/SCSS imports (side-effect imports)
declare module "*.css";
declare module "*.scss";
