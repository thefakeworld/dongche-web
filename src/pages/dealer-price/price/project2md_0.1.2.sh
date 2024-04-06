#!/bin/bash
set -e

# 获得当前绝对路径
CURRENT_PATH=$(pwd)
echo "当前执行的绝对路径是: $CURRENT_PATH"

# 定义文件扩展名和对应的代码块标记的关联数组
declare -A EXTENSION_TO_MARKDOWN
EXTENSION_TO_MARKDOWN=(
    ["py"]="python"
    ["java"]="java"
    ["html"]="html"
    ["js"]="javascript"
    ["css"]="css"
    ["txt"]="plaintext"
    ["md"]="markdown"
    ["jsx"]="jsx"
    ["less"]="less"
)

# 询问用户是直接在当前路径执行还是指定路径
echo "1.直接在当前路径($CURRENT_PATH)执行"
echo "2.指定一个绝对路径执行"

read -p "请选择一个选项 [1/2]: " USER_CHOICE

# 函数用于为不同的文件扩展名添加代码块的语言标识
add_code_block_mark() {
    local extension=${1##*.}
    local language=${EXTENSION_TO_MARKDOWN[$extension]}
    if [[ -n $language ]]; then
        echo "
\`\`\`$language"
    else
        # 无特定语言的代码块
        echo "
\`\`\`"
    fi
}

# 生成 md 文件的函数
generate_md_file() {
    local PATH_TO_SCAN=$1
    cd "$PATH_TO_SCAN"
    
    local FOLDER_NAME=$(basename "$PATH_TO_SCAN")
    local FILENAME="${FOLDER_NAME}_project.md"
    local COUNTER=1
    
    # 检查文件是否已经存在，确保不会重写现有的文件
    while [[ -f "$FILENAME" ]]; do
        FILENAME="${FOLDER_NAME}_project_${COUNTER}.md"
        let COUNTER+=1
    done
    
    # 创建Markdown文件
    echo "# ${FOLDER_NAME} Project Documentation" > "$FILENAME"
    echo "## 1. 项目名称" >> "$FILENAME"
    echo "\`$FOLDER_NAME\`" >> "$FILENAME"
    echo "## 2. 文件结构树" >> "$FILENAME"
    echo '
```' >> "$FILENAME"

    # 添加目录结构，忽略.pyo, .pyc文件和特定的目录
    tree -a -I '.git|node_modules|venv|*.pyc|*.pyo' --dirsfirst >> "$FILENAME"
    echo '
```' >> "$FILENAME"
    
    echo "## 3. 文件内容" >> "$FILENAME"
    # 列出所有文件并加上内容
    local FILE_NUM=0
    
    # # 生成 find 命令的参数
    # local FIND_PARAMS=()
    # for ext in "${!EXTENSION_TO_MARKDOWN[@]}"; do
    #     FIND_PARAMS+=(-o -iname "*.$ext")
    # done
    # FIND_PARAMS[0]="(" # 替换第一个 -o 为 (

    # 生成 find 命令的参数
    local FIND_PARAMS=(-false) # 初始化为一个永远为假的表达式
    for ext in "${!EXTENSION_TO_MARKDOWN[@]}"; do
        FIND_PARAMS+=(-o -iname "*.$ext")
    done

# 使用圆括号时，需要转义
FIND_PARAMS=( \( "${FIND_PARAMS[@]}" \) )


    while IFS= read -r -d '' file; do
        # 跳过二进制和编译的Python文件
        if [[ ! -d "$file" ]] && [[ "$(file --mime "$file")" == *text/* || "$(file --mime "$file")" == *x-empty* ]]; then
            let FILE_NUM+=1
            echo "### 文件${FILE_NUM}: $file" >> "$FILENAME"
            add_code_block_mark "$file" >> "$FILENAME"
            if [[ ! -s "$file" ]]; then
                # 对于空文件，写入Empty file注释
                echo "Empty file." >> "$FILENAME"
            else
                # 如果文件不为空，则写入其内容
                cat "$file" >> "$FILENAME"
            fi
            echo '
```' >> "$FILENAME"
            echo "" >> "$FILENAME"
        fi
    done < <(find . ! -name '*.md' -type f "${FIND_PARAMS[@]}" -print0)
    
    echo "生成的Markdown文件是: $FILENAME"
    echo "任务完成！"
}

# 根据用户选择执行
case "$USER_CHOICE" in
    1)
        generate_md_file "$CURRENT_PATH"
        ;;
    2)
        read -p "请输入绝对路径: " USER_PATH
        generate_md_file "$USER_PATH"
        ;;
    *)
        echo "错误: 无效的选项。请选1或2。"
        exit 1
        ;;
esac
