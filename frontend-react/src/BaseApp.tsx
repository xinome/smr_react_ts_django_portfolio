// import logo from './logo.svg';
import './BaseApp.scss';
import { red } from '@mui/material/colors';

const BaseApp = () => {

  // const isLoggedIn = false;
  const color_red = red[500];
  
  return (
    <div className="app">
      <header className="app-header">
        <div className='header-logo' style={{ backgroundColor: color_red }}>ロゴ</div>
        <div className='header-menu'>
          <div className='header-menu-item'>
            {/* アカウント画像アイコン */}
            アカウントID
          </div>
          <div className='header-menu-item'>マイページ</div>
          <div className='header-menu-item'>パスワード変更</div>
          <div className='header-menu-item'>ログアウト</div>
        </div>
      </header>
      <div className='app-container'>
        <div className='side-menu'>
          <ul>
            <li>ポートフォリオ</li>
            <li>ユーザ基本情報変更</li>
            <li>プロジェクト管理</li>
            <li>プロジェクト作成</li>
            <li>プロジェクト検索</li>
            <li>スカウト管理</li>
            <li>開発Tips</li>
            <li>活動記録</li>
          </ul>
        </div>
        <div className='page-maincontents'>
          <div className='dashboard-carousel section-wrapper'>カルーセル</div>

          <div className='section-wrapper'>
            <div className='section-wrapper-header'>
              <div className='section-wrapper-title'>参加プロジェクト</div>
              <div>詳細を見る</div>
            </div>
            <div className='section-wrapper-contents'>
              <dl>
                <dt>2022.10.01</dt>
                <dd>[プロジェクト]「プロジェクト名」デプロイされました。</dd>
              </dl>
              <dl>
                <dt>2022.10.01</dt>
                <dd>[プロジェクト]「プロジェクト名」デプロイされました。</dd>
              </dl>
              <dl>
                <dt>2022.10.01</dt>
                <dd>[プロジェクト]「プロジェクト名」デプロイされました。</dd>
              </dl>
            </div>
          </div>

          <div className='section-wrapper'>
            <div className='section-wrapper-header'>
              <div className='section-wrapper-title'>ポートフォリオ</div>
              <div>詳細を見る</div>
            </div>
            <div className='section-wrapper-contents'>
              <dl>
                <dt>2022.10.05</dt>
                <dd>「ポートフォリオ1」html / css / wordpress</dd>
              </dl>
              <dl>
                <dt>2022.10.05</dt>
                <dd>「ポートフォリオ2」php / laravel / docker</dd>
              </dl>
              <dl>
                <dt>2022.10.05</dt>
                <dd>「ポートフォリオ3」vue.js / vuetify / node.js / bootstrap</dd>
              </dl>
            </div>
          </div>

          <div className='section-wrapper'>
            <div className='section-wrapper-header'>
              <div className='section-wrapper-title'>活動記録</div>
              <div>詳細を見る</div>
            </div>
            <div className='section-wrapper-contents'>
              <dl>
                <dt>2022.10.01</dt>
                <dd>[プロジェクト]「プロジェクト名」デプロイされました。</dd>
              </dl>
              <dl>
                <dt>2022.10.05</dt>
                <dd>[ポートフォリオ]「ポートフォリオ名」いいねがつきました。</dd>
              </dl>
              <dl>
                <dt>2022.10.11</dt>
                <dd>[スカウト]「社名」からメッセージが届きました。</dd>
              </dl>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default BaseApp;