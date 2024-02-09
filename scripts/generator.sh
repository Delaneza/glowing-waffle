#!/bin/bash

# Nome do modelo passado como argumento
INPUT_MODEL_NAME=$1

# Verifica se o nome do modelo foi fornecido
if [ -z "$INPUT_MODEL_NAME" ]; then
    echo "Usage: $0 <model_name>"
    exit 1
fi

# Função para converter para PascalCase
convert_to_pascal_case() {
    # Substitui hifens e underscores por espaços, capitaliza as palavras, e remove os espaços
    echo "$1" | sed -e 's/[-_]/ /g' | awk '{for(i=1;i<=NF;i++){ $i=toupper(substr($i,1,1)) tolower(substr($i,2)) }}1' | sed -e 's/ //g'
}

# Converte o nome do modelo para PascalCase
MODEL_NAME=$(convert_to_pascal_case "$INPUT_MODEL_NAME")

# Diretórios base
CORE_DIR="src/@core"
INFRA_DIR="src/infra/http"

# Cria diretório e arquivo para o modelo
mkdir -p "$CORE_DIR/domain/models"
echo -e "import mongoose from \"mongoose\";\n\nconst ${INPUT_MODEL_NAME}Schema = new mongoose.Schema({})\n\nexport const ${MODEL_NAME} = mongoose.model(\"${MODEL_NAME}\", ${INPUT_MODEL_NAME}Schema);" > "$CORE_DIR/domain/models/$INPUT_MODEL_NAME.model.ts"
touch "$CORE_DIR/domain/models/$INPUT_MODEL_NAME.model.spec.ts"

# Função para criar arquivos de casos de uso, controladores e fábricas
create_files_for_operation() {
    local operation=$1
    local operationsWithCapitalizedFirstLetter=$(convert_to_pascal_case "$operation")

    # Casos de uso
    local usecaseDir="$CORE_DIR/app/usecases/${INPUT_MODEL_NAME}s"
    mkdir -p "$usecaseDir"
    echo -e "export class ${operationsWithCapitalizedFirstLetter}${MODEL_NAME}Usecase {}" > "$usecaseDir/${operation}-${INPUT_MODEL_NAME}.usecase.ts"
    touch "$usecaseDir/${operation}-${INPUT_MODEL_NAME}.usecase.spec.ts"

    # Controladores
    local controllerDir="$INFRA_DIR/controllers/${INPUT_MODEL_NAME}s"
    mkdir -p "$controllerDir"
    echo -e "export class ${operationsWithCapitalizedFirstLetter}${MODEL_NAME}Controller {}" > "$controllerDir/${operation}-${INPUT_MODEL_NAME}.controller.ts"
    touch "$controllerDir/${operation}-${INPUT_MODEL_NAME}.controller.spec.ts"

    # Fábricas
    local factoryDir="$INFRA_DIR/factories/${INPUT_MODEL_NAME}s"
    mkdir -p "$factoryDir"
    echo -e "import { ${operationsWithCapitalizedFirstLetter}${MODEL_NAME}Controller } from '../../controllers/${INPUT_MODEL_NAME}s/${operation}-${INPUT_MODEL_NAME}.controller';\n\nexport function make${operationsWithCapitalizedFirstLetter}${MODEL_NAME}Controller() {\n  return new ${operationsWithCapitalizedFirstLetter}${MODEL_NAME}Controller();\n}" > "$factoryDir/${operation}-${INPUT_MODEL_NAME}-controller.factory.ts"
    touch "$factoryDir/${operation}-${INPUT_MODEL_NAME}-controller.factory.spec.ts"

    #if operation listUniqueAttributes, the usecase will be List${MODEL_NAME}UniqueAttributesUsecase
    if [ "$operation" = "list-${MODEL_NAME}-unique-attributes" ]; then
        local usecaseDir="$CORE_DIR/app/usecases/${INPUT_MODEL_NAME}s"
        mkdir -p "$usecaseDir"
        echo -e "export class List${MODEL_NAME}UniqueAttributesUsecase {}" > "$usecaseDir/${operation}-${INPUT_MODEL_NAME}.usecase.ts"
        touch "$usecaseDir/${operation}-${INPUT_MODEL_NAME}.usecase.spec.ts"

        local controllerDir="$INFRA_DIR/controllers/${INPUT_MODEL_NAME}s"
        mkdir -p "$controllerDir"
        echo -e "export class List${MODEL_NAME}UniqueAttributesController {}" > "$controllerDir/${operation}-${INPUT_MODEL_NAME}.controller.ts"
        touch "$controllerDir/${operation}-${INPUT_MODEL_NAME}.controller.spec.ts"

        local factoryDir="$INFRA_DIR/factories/${INPUT_MODEL_NAME}s"
        mkdir -p "$factoryDir"
        echo -e "import { List${MODEL_NAME}UniqueAttributesController } from '../../controllers/${INPUT_MODEL_NAME}s/${operation}-${INPUT_MODEL_NAME}.controller';\n\nexport function makeList${MODEL_NAME}UniqueAttributesController() {\n  return new List${MODEL_NAME}UniqueAttributesController();\n}" > "$factoryDir/${operation}-${INPUT_MODEL_NAME}-controller.factory.ts"
        touch "$factoryDir/${operation}-${INPUT_MODEL_NAME}-controller.factory.spec.ts"
    fi
}

# Operações padrão
operations=("create" "update" "show" "list" "list-${MODEL_NAME}-unique-attributes" "delete" "delete-many")

# Cria arquivos para cada operação
for operation in "${operations[@]}"; do
    create_files_for_operation "$operation"
done

# Cria o arquivo de rotas
mkdir -p "$INFRA_DIR/routes"
echo -e "import express, { Router } from 'express';" > "$INFRA_DIR/routes/${INPUT_MODEL_NAME}s.route.ts"
echo -e "const router: Router = express.Router();" >> "$INFRA_DIR/routes/${INPUT_MODEL_NAME}s.route.ts"
echo -e "// Definições de rotas aqui" >> "$INFRA_DIR/routes/${INPUT_MODEL_NAME}s.route.ts"
echo -e "export { router as ${INPUT_MODEL_NAME}Router };" >> "$INFRA_DIR/routes/${INPUT_MODEL_NAME}s.route.ts"

echo "Estrutura para o modelo '$INPUT_MODEL_NAME' criada com sucesso."
