"use client";
import { Badge } from "@/components/ui/badge"

type Language = {
    languages: string[]
}

const languageLabels: Record<string, string> = {
    react: "React",
    vue: "Vue.js",
    angular: "Angular",
    svelte: "Svelte",
    django: "Django",
    flask: "Flask",
    ruby_on_rails: "Ruby on Rails",
    spring: "Spring",
    laravel: "Laravel",
    express: "Express.js",
    asp_net: "ASP.NET",
    flutter: "Flutter",
    react_native: "React Native",
    swift: "Swift",
    kotlin: "Kotlin",
    java: "Java",
    python: "Python",
    javascript: "JavaScript",
    typescript: "TypeScript",
    c_sharp: "C#",
    c_plus_plus: "C++",
    go: "Go",
    rust: "Rust",
    github: "GitHub",
    html: "HTML",
    css: "CSS",
    c: "C",
    nodejs: "Node.js",
    php: "PHP",
    aws: "AWS",
    fairgate: "Fairgate",
    mysql: "MySQL",
    docker: "Docker",
    microservices: "Microservices",
    jsx: "JSX",
    wordpress: "Wordpress",
    jquery: "Jquery",
    raspberry_pi: "Raspberry Pi",
    arduino: "Arduino",
    jetpack_compose: "JetPack Compose",
    ui_kit: "UI Kit",
    xcode: "Xcode",
    objective_c: "Objective C",
    mongodb: "MongoDB",
    command_line: "Command Line",
    liquid: "liquid",
    graphql: "GraphQl",
    shoppify_cli: "Shoppify CLI",
};


/**
 * Displays programming languages as a list of secondary badges.
 *
 * @returns A styled list of badges for the provided programming languages.
 */
export default function languagesBadges({ languages }: Language) {
    return (
        <div className="w-80 m-4">
            <p>Programming Languages:</p>
            <ul className="flex w-full flex-wrap justify-center gap-2">{languages.map((lang, index) => (
                <li key={index}>
                    <Badge variant={'secondary'}>{languageLabels[lang] ?? lang}</Badge>
                </li>
            ))}</ul>
        </div>
    );

}