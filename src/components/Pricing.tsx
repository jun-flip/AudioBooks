const Pricing = () => {
  return (
    <section id="pricing" className="py-20 bg-white scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
            Выберите свой план
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Гибкие тарифы для любых потребностей. Начните с бесплатного периода
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Free Plan */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover-lift transition-all duration-300">
            <div className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Бесплатный</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">0₽</span>
                <span className="text-gray-600">/месяц</span>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600">Доступ к 50 книгам</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600">Стандартное качество</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600">Реклама</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600">Базовые функции</span>
                </li>
              </ul>
              <button className="w-full btn-secondary">
                Начать бесплатно
              </button>
            </div>
          </div>

          {/* Explorer Plan */}
          <div className="bg-gradient-to-b from-indigo-500 to-indigo-600 rounded-2xl shadow-xl overflow-hidden hover-lift transition-all duration-300 transform scale-105">
            <div className="p-8">
              <div className="mb-4">
                <span className="inline-block px-3 py-1 text-sm font-semibold text-indigo-600 bg-white rounded-full">
                  Популярный
                </span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Исследователь</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-white">100₽</span>
                <span className="text-indigo-100">/месяц</span>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-indigo-200 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-white">Доступ к 500 книгам</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-indigo-200 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-white">Высокое качество звука</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-indigo-200 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-white">Без рекламы</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-indigo-200 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-white">Офлайн режим</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-indigo-200 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-white">Персональные рекомендации</span>
                </li>
              </ul>
              <button className="w-full bg-white text-indigo-600 hover:bg-indigo-50 transition-colors py-3 px-6 rounded-lg font-medium">
                Попробовать 7 дней бесплатно
              </button>
            </div>
          </div>

          {/* Pro Plan */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover-lift transition-all duration-300">
            <div className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Про</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">500₽</span>
                <span className="text-gray-600">/месяц</span>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600">Полный доступ к библиотеке</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600">Максимальное качество звука</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600">Все функции Исследователя</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600">Приоритетная поддержка</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600">Ранний доступ к новинкам</span>
                </li>
              </ul>
              <button className="w-full btn-secondary">
                Попробовать 7 дней бесплатно
              </button>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Часто задаваемые вопросы
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 rounded-lg p-6">
              <h4 className="text-lg font-medium text-gray-900 mb-2">
                Можно ли отменить подписку?
              </h4>
              <p className="text-gray-600">
                Да, вы можете отменить подписку в любой момент. Доступ к контенту сохранится до конца оплаченного периода.
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <h4 className="text-lg font-medium text-gray-900 mb-2">
                Как работает пробный период?
              </h4>
              <p className="text-gray-600">
                При оформлении платной подписки вы получаете 7 дней бесплатного доступа. Если не отмените подписку, она автоматически продлится.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Pricing 