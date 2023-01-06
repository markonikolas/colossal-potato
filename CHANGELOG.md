# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Added

- Add ES384 algorithm for signing and verifying jwt tokens

### Removed

- Remove default HS256 algorithm for signing and verifying jwt tokens

## [0.4.0] - 2022-09-02

### Added

- Add refresh token reuse detection
- Add refresh token rotation
- Add access & refresh token authentication
- Add redis docker service
- Add authentication middleware to validate incoming requests

### Update

- Update client side layout

## [0.3.0] - 2022-07-30

### Added

- Add Dashboard page
- Add lodash-es as a dependency
- Add vite for bundling assets
- Create, read, update & delete user capability
- Create, delete, update post capability

### Update

- Update blog layout

## [0.2.0] - 2022-07-26

### Changed
- Fetch data from local database

### Added
- 3 tier architecture
- Typescript support
- Prisma ORM
- Posts table
- Users table
- TypeScript support

### Removed
- demo db.json

## [0.1.0] - 2022-07-01

### Added
- Add blog component
- Add sign up view component
- Add log in view component
- Add client side routing
- Add basic server
