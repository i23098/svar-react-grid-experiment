import com.github.gradle.node.npm.task.NpxTask

plugins {
    id("com.github.node-gradle.node") version "7.1.0"
}

node {
    download = true
    version = "24.11.1"

    workDir = rootProject.layout.buildDirectory.get().dir("nodejs") // where node is downloaded to
    nodeProjectDir = rootProject.rootDir; // where package.json is read and node_modules downloaded
}

tasks.npmInstall {
    inputs.file(rootProject.rootDir.resolve("package.json"));

    val packageLockFile = rootProject.rootDir.resolve("package-lock.json");
    if (packageLockFile.exists()) {
        inputs.file(packageLockFile)
    }

    outputs.file(packageLockFile)
    outputs.dir(rootProject.rootDir.resolve("node_modules"))
}

val webpackTask = tasks.register<NpxTask>("webpack") {
    dependsOn("npmInstall")

    val outputDir = project.layout.buildDirectory.dir("webpack-js");
    val relativeOutputDir = "." + File.separatorChar + outputDir.get().asFile.relativeTo(project.projectDir)

    workingDir = project.projectDir
    command = "webpack"
    args = listOf(
        "--env=outputDir=$relativeOutputDir"
    )

    inputs.file(project.projectDir.resolve("webpack.config.js"))
    inputs.files(fileTree(rootProject.rootDir.resolve("node_modules")).exclude(".cache"))
    inputs.dir(project.projectDir.resolve("src/react-js"))

    outputs.dir(outputDir)
}

project.afterEvaluate {
    tasks.getByName("build").dependsOn(webpackTask);
}


val distTask = tasks.register<Copy>("dist") {
    dependsOn(webpackTask)

    from(project.layout.buildDirectory.dir("webpack-js"))
    from(project.layout.projectDirectory.dir("src/")) {
        exclude("react-js/**")
    }

    into(project.layout.buildDirectory.dir("dist"))
}

tasks.register("build") {
    dependsOn(distTask)
}