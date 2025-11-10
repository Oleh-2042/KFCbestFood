name: Build and Publish .NET App

on:
  push:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout code
      uses: actions/checkout@v3

    - name: Setup .NET
      uses: actions/setup-dotnet@v3
      with:
        dotnet-version: '8.0.x'

    - name: Restore dependencies
      run: dotnet restore "projekt zespolowy.sln"

    - name: Build
      run: dotnet build "projekt zespolowy.sln" --configuration Release

    - name: Publish
      run: dotnet publish "projekt zespolowy/projekt zespolowy.csproj" -c Release -o ./publish

    - name: Upload artifact
      uses: actions/upload-artifact@v3
      with:
        name: published-app
        path: ./publish
