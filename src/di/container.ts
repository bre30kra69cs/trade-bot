/**
 * DI
 */
import {Container} from 'inversify';
import {Token} from './Token';
/**
 * Interfaces
 */
import {App} from '../app/interface';
import {Logger} from '../logger/interface';
import {CycleManager} from '../cycleManager/interface';
import {DataLoader} from '../dataLoader/interface';
import {Config} from '../config/interface';
import {Connector} from '../connector/interface';
import {Storage} from '../storage/interface';
import {ThinkStrategy} from '../thinkStrategy/interface';
import {ApplyStrategy} from '../applyStrategy/interface';
/**
 * Implementations
 */
import {AppRoot} from '../app/AppRoot';
import {LoggerBase} from '../logger/LoggerBase';
import {CycleManagerBase} from '../cycleManager/CycleManagerBase';
import {DataLoaderBase} from '../dataLoader/DataLoaderBase';
import {ConfigEnv} from '../config/ConfigEnv';
import {ConnectorBase} from '../connector/ConnectorBase';
import {StorageInMemmory} from '../storage/StorageInMemmory';
import {ThinkStrategyArbitrage} from '../thinkStrategy/ThinkStrategyArbitrage';
import {ApplyStrategyDummy} from '../applyStrategy/ApplyStrategyDummy';

export const contariner = new Container();
contariner.bind<App>(Token.App).to(AppRoot);
contariner.bind<Logger>(Token.Logger).to(LoggerBase);
contariner.bind<CycleManager>(Token.CycleManager).to(CycleManagerBase);
contariner.bind<DataLoader>(Token.DataLoader).to(DataLoaderBase);
contariner.bind<Config>(Token.Config).to(ConfigEnv);
contariner.bind<Connector>(Token.Connector).to(ConnectorBase);
contariner.bind<Storage>(Token.Storage).to(StorageInMemmory);
contariner.bind<ThinkStrategy>(Token.ThinkStrategy).to(ThinkStrategyArbitrage);
contariner.bind<ApplyStrategy>(Token.ApplyStrategy).to(ApplyStrategyDummy);
