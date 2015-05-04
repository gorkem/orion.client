
global.node_require = global.require;

delete global.require;
delete global.module;
delete global.__filename;
delete global.__dirname;
delete global.process;
