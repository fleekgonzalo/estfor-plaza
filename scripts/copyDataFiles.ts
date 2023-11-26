
import { copyFile } from "fs/promises"

async function main() {
    await copyFile('../estfor-contracts/scripts/data/actions.ts', './src/data/actions.ts')

    await copyFile('../estfor-contracts/scripts/data/items.ts', './src/data/items.ts')

    await copyFile('../estfor-contracts/scripts/data/actionChoices.ts', './src/data/actionChoices.ts')
}

main().catch((e) => {
    console.error(e)
    process.exit(1)
})