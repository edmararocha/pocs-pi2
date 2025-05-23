@echo off
setlocal

set MVNW_VERBOSE=
set MVNW_DEBUG=
set MVNW_LAUNCHER=mvnw.cmd
set MVNW_CALL=%~dp0mvn.cmd
set MVNW_CMD_LINE_ARGS=%*
set MVNW_DEBUG_LOG=%TEMP%\mvnw-debug.log
set MVNW_VERBOSE_LOG=%TEMP%\mvnw-verbose.log

if defined MVNW_VERBOSE (
  echo on
)

REM Check for Java
java -version >nul 2>&1
if errorlevel 1 (
  echo Java is not installed or not in your PATH.
  exit /b 1
)

REM Run Maven Wrapper jar
set MAVEN_WRAPPER_JAR=%~dp0.mvn\wrapper\maven-wrapper.jar
if not exist "%MAVEN_WRAPPER_JAR%" (
  echo Maven Wrapper JAR not found: %MAVEN_WRAPPER_JAR%
  exit /b 1
)

java -jar "%MAVEN_WRAPPER_JAR%" %MVNW_CMD_LINE_ARGS%