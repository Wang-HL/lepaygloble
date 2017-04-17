package com.jifenke.lepluslive.merchant.repository;

import com.jifenke.lepluslive.merchant.domain.entities.Merchant;
import com.jifenke.lepluslive.merchant.domain.entities.MerchantUser;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

/**
 * Created by wcg on 16/5/18.
 */
public interface MerchantUserRepository extends JpaRepository<MerchantUser, Long> {

    Optional<MerchantUser> findByName(String userName);

    Optional<MerchantUser> findMerchantUserByMerchantSid(String merchantSid);

    List<MerchantUser> findAllByMerchant(Merchant merchant);

    /**
     * 查询商户的会员锁定上限
     * @param userName
     * @return
     */
    @Query(value = "SELECT a.lock_limit from merchant_user a where a.`name`=?1",nativeQuery = true)
    Integer findLockLimitByName(String userName);

    /**
     * 查询收银员账号
     */
    @Query(value="SELECT * FROM merchant_user WHERE type = 0 and create_user_id = ?1 ",nativeQuery = true)
    List<MerchantUser> findCashierAccount(Long merchantUserId);
    /**
     *  查询店主账号
     */
    @Query(value="SELECT * FROM merchant_user WHERE type = 1 and create_user_id = ?1 ",nativeQuery = true)
    List<MerchantUser> findOwerAccount(Long merchantUserId);

    /**
     *  根据名称查询用户
     */
    @Query(value="SELECT * FROM merchant_user WHERE name=?1 ",nativeQuery = true)
    MerchantUser findByUserName(String userName);
}

